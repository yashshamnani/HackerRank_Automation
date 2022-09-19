const puppeteer= require("puppeteer");
const code = require('./code');

const mail= "xayin14865@ulforex.com";
const password= "9179624194@";

(async function(){
    let browser = await(puppeteer.launch({headless:false, defaultViewport:null, args: ['--start-fullscreen']}));
    let page = await browser.newPage();
    await page.goto('https://www.hackerrank.com/');
    await waitAndClick("ul.menu a ",page);
    await page.waitForSelector(".fl-module-content.fl-node-content .fl-button");
    await page.evaluate(function(){
        let btns = document.querySelectorAll(".fl-module-content.fl-node-content .fl-button");
        btns[1].click();
        return;

    });
    await page.waitForSelector("#input-1");
    await page.type("#input-1", mail, {delay:100});
    await page.type("#input-2", password, {delay:100});
    await page.click('button[data-analytics="LoginPassword"]');
    await waitAndClick('[data-automation="algorithms"]',page);
    await page.waitForSelector(".filter-group");
    await page.evaluate(function(){
        let allDivs = document.querySelectorAll(".filter-group");
        let div = allDivs[3];
        let clickSelector = div.querySelector('.ui-checklist-list-item input');
        clickSelector.click();
        return;
    });
    await page.waitForSelector('.challenges-list .js-track-click.challenge-list-item');
    let questionsArr = await page.evaluate(function(){
        let arr=[];

        let aTags = document.querySelectorAll('.challenges-list .js-track-click.challenge-list-item');
        for(let i=0;i<aTags.length ; i++){
            let link = aTags[i].href;
            arr.push(link);
        }
        return arr;
    })
    for(let i=1; i<questionsArr.length; i++){
        await questionSolver(questionsArr[i], code.answers[i], page);

    }

})();




async function waitAndClick(selector, page){
    await page.waitForSelector(selector);
    await page.click(selector);
}
async function questionSolver(question, answer, page){
    await page.goto(question);
    await waitAndClick('.checkbox-wrap',page);
    await waitAndClick('.input.text-area.custominput.auto-width',page);
    await page.type('.input.text-area.custominput.auto-width',answer);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('X');
    await page.keyboard.up('Control');
    await waitAndClick('.lines-content.monaco-editor-background',page);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled',page);

}