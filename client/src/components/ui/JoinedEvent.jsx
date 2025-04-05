import React from 'react'
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material'
const JoinedEvent = () => {
    return (
        <Card sx={{ minWidth: 200 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    Date
                </Typography>
                <Typography variant="h5" component="div">
                    Title
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Created by</Typography>
                <Typography variant="body2">
                    Course Code
                    <br />
                    Start time - End time
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default JoinedEvent