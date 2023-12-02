'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
  console.log('Link was clicked!');

  /* remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

  /* get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
  console.log('targetArticle:', targetArticle);
}


/* Kolejna funkcja - generowanie listy tytułów */

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('Articles:', optArticleSelector + customSelector);

    /* get the article id */
    let html = '';

    for(let article of articles){
      const articleId = article.getAttribute('id');
    
    /* find the title element */
    /* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('Link HTML:', linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log('html:', html);
    }
    
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
}

generateTitleLinks();


/* Kolejna funkcja lekcja 6.2 - Generujemy listę tagów: */

function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */

  for(let article of articles){

    /* find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    console.log('tagWrapper:', tagWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags:', articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray:', articleTagsArray);

    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log('TAG:', tag);

    /* generate HTML of the link */
    const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log('HTML TAGS:', html);

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

/* Dodajemy akcję po kliknięciu w tag */

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('href:', href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag:', tag);

  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('Active tag links:', activeTagLinks);

  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){

    /* remove class active */
    activeTagLink.classList.remove('active');

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const allHrefEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('allHrefEqual:', allHrefEqual);

  /* START LOOP: for each found tag link */
  for(let hrefEqual of allHrefEqual){

    /* add class active */
    hrefEqual.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find authors wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    console.log('authorWrapper:', authorWrapper);
  
    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor', articleAuthor);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    console.log('linkHTML', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;


  /* END LOOP: for every article: */
  }
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Author was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('Active tag links:', activeAuthorLinks);

  /* START LOOP: for each active autor link */
  for(let activeAuthorLink of activeAuthorLinks){

    /* remove class active */
    activeAuthorLink.classList.remove('active');

  /* END LOOP: for each active author link */
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const allHrefEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('allHrefEqual:', allHrefEqual);

  /* START LOOP: for each found autor link */
  for(let hrefEqual of allHrefEqual){

    /* add class active */
    hrefEqual.classList.add('active');

  /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */
  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();