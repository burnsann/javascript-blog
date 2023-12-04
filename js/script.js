'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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


function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  const result = optCloudClassPrefix + classNumber;

  return result;
}


/* Kolejna funkcja lekcja 6.2 - Generujemy listę tagów: */
function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      /* const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>'; */
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('HTML TAGS:', html);
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams', tagsParams);

  /* [NEW] create variable for all links HTML code */
  /* let allTagsHTML = ''; // this code was chandeg in one below:*/
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    /* allTagsHTML += tagLinkHTML;
    console.log('allTagsHTML:', allTagsHTML); */
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData:', allTagsData);
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
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

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
    const author = article.getAttribute('data-author');
    console.log('Author', author);

    /* generate HTML of the link */
    /* const linkHTML = '<a href="#author-' + author + '">' + author + '</a>'; */
    const linkHTMLData = {id: author, title: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    console.log('linkHTML', linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(author)){
      /* [NEW] add authors to allAuthor object */
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
    
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] add html from allAuthors to authorsList */
  /* authorList.innerHTML = allAuthors.join(' '); */
  console.log('allAuthors:', allAuthors);

  /* [NEW] Create new variable for all links HTML code */
  /* let allAuthorsHTML = ''; // new code below:*/
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each authot in allAuthors */
  for(let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    /* allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + '</a> (' + allAuthors[author] + ') </li>'; */
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  
  } /* [NEW] END LOOP */

  /* [NEW] add html from allAuthorsHTML to authorList */
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log('allAuthorsData:', allAuthorsData);
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