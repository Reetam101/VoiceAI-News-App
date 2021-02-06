import React from 'react'
import { Grid, Typography, Chip } from '@material-ui/core'
import useStyles from './styles'; 
import GitHubIcon from '@material-ui/icons/GitHub';

const Footer = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.footer} container direction="column" justify="center" alignItems="center">
            <Typography variant="body2">Created by <strong>Reetam Chatterjee</strong></Typography>
            
            <Chip
                color="primary"
                icon={<GitHubIcon />}
                label="Github"
                onClick={() => window.open("https://github.com/Reetam101", "_blank")}
                variant="outlined"
            />
        </Grid>
    )
}

export default Footer
