const Mock = require('mockjs')
const Random = Mock.Random
const focusData = function () {
    let focus = []
    for (let index = 0; index < 10; index++) {
        let newFocus = {
            url: '#',
            title: Random.csentence(10, 50),
            img: Random.dataImage('600x300', 'focus')
        }
        focus.push(newFocus)
    }
    return {
        focus:focus
    }
}

const newsData = function () {
    let news = []
    for (let index = 0; index < 10; index++) {
        let newNews = {
            id: Random.integer(1, 100),
            url: '#',
            title: Random.csentence(10, 50),
            img: Random.dataImage('400x400', 'news')
        }
        news.push(newNews)
    }
    return {
        news:news
    }
}

const caseData = function () {
    let cases = []
    for (let index = 0; index < 10; index++) {
        let newCase = {
            id: Random.integer(1, 100),
            url: '#',
            title: Random.csentence(10, 30),
            desc: Random.csentence(10, 50),
            src: Random.dataImage('400x400', 'case'),
            meta: {
                source: '来源信息',
                date: '时间',
                other: '其他信息'
            }
        }
        cases.push(newCase)
    }
    return {
        cases: cases
    }
}

Mock.mock('/focus/api', 'post', focusData)
Mock.mock('/news/api', 'post', newsData)
Mock.mock('/case/api', 'post', caseData)
