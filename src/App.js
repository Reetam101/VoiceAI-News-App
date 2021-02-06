import React, { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import NewsCards from './components/NewsCards/NewsCards';
import logo from './logo.png';
import useStyles from './styles'
import Footer from './components/Footer/Footer';

import wordsToNumbers from 'words-to-numbers'

const App = () => {

    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_KEY,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }
                else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try again')
                    }
                    else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src={logo} alt="Logo" className={classes.ourLogo}></img>
                <h1 className={classes.heading}>Voice AI powered News App</h1>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />

            <Footer />
        </div>
    )
}

export default App;