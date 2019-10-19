import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  'image-grid': {
    paddingTop:    '2.5em',
    paddingBottom: '2.5em',
  },
}));

const Images = ({
  learningLink, knownLink, learningImages, knownImages
}) => {
  const classes = useStyles();

  const [state, setState] = useState({ currentLang: 'learningImages', previousScroll: -1 });
  const [imgDimentions, setImgDimentions] = useState({ width: -1, height: -1, heightDiff: -1 });

  const lessImages = learningImages.length < knownImages.length ? 'learningImages' : 'knownImages';
  const moreImages = learningImages.length > knownImages.length ? 'learningImages' : 'knownImages';
  const heightDiff = Math.max(learningImages.length, knownImages.length) / Math.min(learningImages.length, knownImages.length);
  const imagesObj  =  { learningImages, knownImages };

  useEffect(() => {
    if ( state.previousScroll > 0 ) {
      document.body.scrollTop = document.documentElement.scrollTop = state.previousScroll;
    }

    if ( imgDimentions.width <= 0 || imgDimentions.height <= 0 ) {
      const renderedGreaterImg = document.querySelector(`.${ moreImages }-img`);
      const rendereFewerImg    = document.querySelector(`.${ lessImages }-img`);

      const minHeight = Math.min(renderedGreaterImg.height, rendereFewerImg.height);

      setImgDimentions({
        width:  Math.min(renderedGreaterImg.width, rendereFewerImg.width),
        height: minHeight * heightDiff
      });
    }
  });

  return (
    <Paper>
      <Grid
        container
        spacing    = { 2 }
        direction  = "column"
        justify    = "center"
        alignItems = "center"
        className  = { classes['image-grid'] }
      >
        {
          imagesObj[ lessImages ].map( ( fewerImage, index ) => {
            return (
              <Grid item key = { `${ index }-fewerImage` } style={{ padding: 0 }}>
              {
                imagesObj[ moreImages ].slice(
                    index * heightDiff,
                    index * heightDiff + heightDiff
                ).map( greaterImage => {
                  return (
                    <img
                      src       = { `/image/${ encodeURIComponent( greaterImage ) }/${ encodeURIComponent( moreImages.includes('learning') ? learningLink : knownLink ) }` }
                      className = { `${ moreImages }-img` }
                      style     = {{ display: state.currentLang === moreImages ? 'inherit' : 'none' }}
                      onClick   = { e => setState({ 
                        currentLang: state.currentLang === moreImages ? lessImages : moreImages,
                        previousScroll: document.documentElement.scrollTop,
                      }) }
                      {
                        ...imgDimentions.width > 0 && imgDimentions.height > 0
                          ? {
                            width:  imgDimentions.width,
                            height: imgDimentions.height / heightDiff,
                          }
                          : {}
                      }
                    />
                  )
                  })
              }
              <img
                src       = { `/image/${ encodeURIComponent( fewerImage ) }/${ encodeURIComponent( lessImages.includes('learning') ? learningLink : knownLink ) }` }
                className = { `${ lessImages }-img` }              
                style     = {{ display: state.currentLang === lessImages ? 'inherit' : 'none' }}
                onClick   = { e => setState({ 
                  currentLang: state.currentLang === lessImages ? moreImages : lessImages,
                  previousScroll: document.documentElement.scrollTop,
                }) }
                {
                  ...imgDimentions.width > 0 && imgDimentions.height > 0
                    ? {
                      width:  imgDimentions.width,
                      height: imgDimentions.height,
                    }
                    : {}
                }
              />
            </Grid>
            )
          })
        }
      </Grid>
    </Paper>
  );
}

Images.propTypes = {
  learningImages: PropTypes.arrayOf( PropTypes.string ).isRequired,
  knownImages:    PropTypes.arrayOf( PropTypes.string ).isRequired
}

export default Images;
