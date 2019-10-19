import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { Grid, Button, CircularProgress } from '@material-ui/core';

import Inputs from '../components/inputs';
import Images from '../components/images';
import queries from '../data/queries';
import { getNextChapterLink } from '../utils';

function Main() {
  const [learningLink, setLearningLink] = useState('');
  const [knownLink, setKnownLink]       = useState('');
 
  const [getLearningImages, { data: learningImages, loading: learningLoading}] = useLazyQuery( queries.getImages );
  const [getKnownImages, { data: knownImages, loading: knownLoading}]          = useLazyQuery( queries.getImages );

  const hasLinks  = learningLink && knownLink;
  const loading   = learningLoading || knownLoading;
  const hasImages = learningImages || knownImages;

  if ( hasLinks && !loading && !hasImages ) {
    getLearningImages({ variables: { url: learningLink } });
    getKnownImages({ variables: { url: knownLink } });
  }

  return (
    <>
      {
        loading && (
          <Grid
            container
            justify    = "center"
            alignItems = "center"
            style={{ marginTop: '50vh' }}
          >
            <CircularProgress />
          </Grid>
        )
      }
      {
        !loading && !hasImages && (
          <Inputs
            learningLink    = { learningLink }
            setLearningLink = { setLearningLink }
            knownLink       = { knownLink }
            setKnownLink    = { setKnownLink }
          />
        )
      }
      {
        !loading && hasImages && (
          <>
            <Images
              learningLink   = { learningLink }
              knownLink      = { knownLink }
              learningImages = { learningImages.webtoon.images }
              knownImages    = { knownImages.webtoon.images }
            />
            <Grid
              container
              justify    = "center"
              alignItems = "center"
              style={{ padding: 20 }}
            >
              <Button
                xs      = { 4 }
                onClick = { () => {
                  const newLearningLink = getNextChapterLink( learningLink );
                  const newKnownLink    = getNextChapterLink( knownLink );

                  setLearningLink( newLearningLink );
                  setKnownLink( newKnownLink );

                  getLearningImages({ variables: { url: newLearningLink } });
                  getKnownImages({ variables: { url: newKnownLink } });
                }}
              >
                Next Chapter
              </Button>
            </Grid>
          </>
        )
      }
    </>
  );
}

export default Main;
