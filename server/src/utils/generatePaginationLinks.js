const { URL } = require('url');

// Helper function to generate pagination links
const generatePaginationLinks = (originalUrl, currentPage, totalPages, limit) => {
    const generatePaginationUrl = (pageNum) => {
        const url = new URL(originalUrl, "http://temp.com");
        url.searchParams.set('page', pageNum);
        url.searchParams.set('limit', limit);
        return url.toString().replace("http://temp.com", '');
    };

    const paginationLinks = {};
    paginationLinks.first = generatePaginationUrl(1);
    paginationLinks.previous = '';
    paginationLinks.next = '';
    paginationLinks.last = generatePaginationUrl(totalPages);

    if (currentPage > 1) {
        paginationLinks.previous = generatePaginationUrl(currentPage - 1);
    }

    if (currentPage < totalPages) {
        paginationLinks.next = generatePaginationUrl(currentPage + 1);
    }

    return paginationLinks;
};

module.exports = { generatePaginationLinks };
