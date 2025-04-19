const asyncHandler = require('express-async-handler');
const cheerio = require('cheerio');
const fetch = global.fetch;

const QUT_EVENTS_URL = 'https://www.qut.edu.au/?a=713298';

function parseTimeRange(timeText) {
  const timePattern = /(\d{1,2})([:.](\d{2}))?\s*(am|pm)?/gi;
  const matches = [...timeText.matchAll(timePattern)].map((m) => ({
    hour: parseInt(m[1], 10),
    minute: m[3] ? parseInt(m[3], 10) : 0,
    meridian: m[4]?.toLowerCase() || null,
  }));

  if (matches.length < 1) return { startTime: null, endTime: null };

  const to24Hour = ({ hour, minute, meridian }) => {
    if (meridian === 'pm' && hour < 12) hour += 12;
    if (meridian === 'am' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const startTime = to24Hour(matches[0]);
  const endTime = matches[1] ? to24Hour(matches[1]) : startTime;

  return { startTime, endTime };
}

function parseDateRange(dateText) {
  const [start, end] = dateText.split('-').map(s => s.trim());
  return {
    startDate: start || null,
    endDate: end || start || null
  };
}

exports.getAllEvents = asyncHandler(async (req, res) => {
  const response = await fetch(QUT_EVENTS_URL);
  const html = await response.text();
  const $ = cheerio.load(html);
  const events = [];

  $('.col-md-4[data-release-id]').each((_, el) => {
    const $el = $(el);
    const id = $el.attr('data-release-id');

    const imageStyle = $el.find('.box-image-top').attr('style');
    const imageMatch = imageStyle?.match(/url\((.*?)\)/);
    const image = imageMatch ? imageMatch[1] : null;

    const dateText = $el.find('.box-heading h3').text().trim();
    const { startDate, endDate } = parseDateRange(dateText);

    const titleEl = $el.find('h4.mt-2 a');
    const title = titleEl.text().trim();
    const link = titleEl.attr('href');

    const description = $el.find('.box-content p').first().text().trim();
    const whenText = $el.find('.box-content p:contains("When:")').text().replace(/^When:\s*/i, '').trim();
    const whereText = $el.find('.box-content p:contains("Where:")').text().replace(/^Where:\s*/i, '').trim();

    const { startTime, endTime } = parseTimeRange(whenText);

    events.push({
      id,
      title,
      date: dateText,
      description,
      link,
      where: whereText || null,
      startDate,
      endDate,
      startTime,
      endTime,
      image,
    });
  });

  res.json({
    success: true,
    count: events.length,
    data: events,
  });
});
