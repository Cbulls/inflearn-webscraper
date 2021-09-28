const axios = require('axios'); // url의 html을 가져옴.
const cheerio = require('cheerio') // 가져온 데이터를 파싱하는 역할. jQuery처럼 동작
const parsing = async (keyword) => { // html을 파싱
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data); // $는 그냥 jQuery처럼 보이기 위해
    const $courseList = $('.course_card_item');
    let courses = []
    $courseList.each((idx,node) => { 
        courses.push({
            title : $(node).find('.course_title:eq(0)').text(),
            instructor : $(node).find('.instructor').text(),
            price : $(node).find('.pay_price').text(),
            rating: $(node).find('.star_solid').css('width'),
            review_count : $(node).find('.review_cnt').text()
        })
    })
    console.log(courses)
    // console.log($courseTitle);
    

}

const getHTML = async(keyword) => {
    try{
        return await axios.get('https://www.inflearn.com/courses?s=' + encodeURI(keyword))
    }
    catch(err){
        console.log(err)
    }
}

parsing('자바스크립트');


// 유튜브 개발자의 품격 참조