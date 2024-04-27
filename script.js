//get all the html elements
const searchArticle = document.getElementById("searchArticle");
const categorySelect = document.getElementById("category-select");
const languageSelect = document.getElementById("language-select");
const countrySelect = document.getElementById("country-select");
const keyword = document.getElementById("keyword");

//function to create elements
function element(tag, classname, id, text) {
    let tags = document.createElement(tag);
    tags.classList = classname;
    tags.id = id;
    tags.innerHTML = text;
    return tags;
  }

//API hit while clicking on search button

searchArticle.addEventListener("click",()=>{
    console.log(categorySelect.value,languageSelect.value,countrySelect.value,keyword.value);
    //Values like category language country and keyword are send to API through passing parameters
    const APIKey = "1f9c5f39d9134cc0ddaee98e216f621e";
    const getArticle = fetch(`https://gnews.io/api/v4/search?q=${keyword.value}&lang=${languageSelect.value}&country=${countrySelect.value}&category=${categorySelect.value}&apikey=${APIKey}`);

    getArticle
    .then((result)=>result.json())  //Convert readable API data into json 
    .then((data)=>{
        console.log(data);
        const articleContainer = document.getElementById("articleContainer");    
        console.log(data.articles.length);
        const totalArticles = document.getElementById("totalArticles"); 
        totalArticles.innerHTML = `Showing ${data.articles.length} out of ${data.totalArticles} articles`;//Display number of articles and articles shown in the page.by default 10 articles only are shown
        for(let i=0;i<data.articles.length;i++){
            //Showing articles in bootstrap cards.Every article is taken as card and hence it is created in for loop
            const cardCol = element("div","col"," "," ");
            const card = element("div","card"," "," ");
            const linkUrl = element("a"," "," "," ");
            const cardImage = element("img","card-img-top"," "," ");
            const cardBody = element("div","card-body"," "," ");
            const cardFooter = element("div","card-footer"," "," ");
            console.log(data.articles[i].image);
            linkUrl.setAttribute("href",`${data.articles[i].url}`);  // link to source article page
            linkUrl.setAttribute("target","_blank");
            linkUrl.setAttribute("title",`${data.articles[i].title}`);
            cardImage.setAttribute("src",`${data.articles[i].image}`); // Image of the article
            cardImage.setAttribute("alt",`${data.articles[i].title}`); // show article title if image is not available
            cardBody.innerHTML = `<h5 class="card-title">${data.articles[i].title}</h5>
            <p class="card-text">${data.articles[i].content}</p>`;// title and content of the article shown in card-body
            cardFooter.innerHTML=`<small class="text-body-secondary">${data.articles[i].publishedAt}</small>`;// publishing details of the article shown in card footer
            //Created cards are appended
            linkUrl.append(cardImage);
            card.append(linkUrl,cardBody,cardFooter);
            cardCol.append(card);
            articleContainer.append(cardCol);

            //show container after search results
            document.getElementById("articleDisplay").setAttribute("style","visibility:visible");
           
         }

       
    
    })
    .catch((error)=>articleContainer.innerHTML = error) // error is displayed in the container
});


