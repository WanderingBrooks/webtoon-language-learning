const getNextChapterLink = link => {
  const webtoonChapterNumberRegex = /(&episode_no=)(\d+)(.*)/;
  const 네이버ChapterNumberRegex    = /(&no=)(\d+)(.*)/;

  return link.replace(
    link.includes('webtoons.com')
      ? webtoonChapterNumberRegex
      : 네이버ChapterNumberRegex,
    ( s, p1, p2, p3 ) => `${ p1 }${ Number.parseInt( p2 ) + 1 }${ p3 }`
  );
};

export {
  getNextChapterLink
};