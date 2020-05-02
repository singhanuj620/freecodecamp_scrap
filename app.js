const 	express 	=	require('express'),
		ejs			=	require('ejs'),
		request 	=	require('request-promise'),
		cheerio		=	require('cheerio'),
		app			=	express();

app.set('view engine' , 'ejs');

app.get('/',async (req,res) => {
	let t = {}
	let a = {}
	let l = {}
	const scrap_url='https://www.freecodecamp.org/news/';
	await request({
    method: 'GET',
    url: scrap_url
}, async (err, res, body) => {
		let title={}
		let author ={}
		let link = {}
	    if (err) return console.error(err);

	    let $ = await cheerio.load(body);

	    let titles = await $('.post-card-title > a');
	    for(let i=0;i<titles.length;i++) {
	    	let temp = titles[i].children[0].data.trim();
	    	title[i] = temp;
	    	let flag = 'https://www.freecodecamp.org'+titles[i].attribs.href.trim();
	    	link[i] = flag
	    }
	    console.log();
	    t = {... title};
	    l = {... link};
	    let authors = await $('.author-name-tooltip');
	    for(let i=0;i<authors.length;i++){
	    	let temp = authors[i].children[0].data.trim()
	    	author[i]= temp
	    }
	    a = {...author}
	});
	let len = Object.keys(t).length
	res.render('homepage',{title:t,len:len,link:l,author:a});
	// res.send('Anuj');
});

app.get("/*",(req,res) => {
	res.redirect('/');
});

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
	console.log('Server is running on ',port);
});
