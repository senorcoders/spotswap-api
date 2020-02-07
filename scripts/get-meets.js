// scripts/get-meets.js
var request = require('request');
var cheerio = require('cheerio');
const pup = require('puppeteer');

module.exports = {


  friendlyName: 'Get meets',


  description: '',

  inputs: {

  },
  exits: {

    success: {
      outputFriendlyName: 'Meets',
      outputType: 'ref'
    },

  },


  fn: async function () {

    let url = "https://www.trackwrestling.com/Login.jsp";

    let browser = await pup.launch({headless: true});
    //let browser = await pup.launch();
    let page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle2'});

    //await page.click("div.userLogin");
    await page.waitForSelector('.partners');

    for (i = 0; i<4;i++){
      let meetInfo = await grabMeets(page);
      await addMeets(meetInfo);
      await page.evaluate(() => { nextTournaments() })
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
    }

    debugger;

    await browser.close();

    
    //return meets;

  }


};

async function addMeets(meetInfo){
  let len1 = meetInfo.nameList.length;
  let len2 = meetInfo.address.length;
  let nameL = meetInfo.nameList;

  console.log("Len1 & Len2: ", len1 + " " + len2);
  for (i=0; i<len1; i++){
    console.log("Meetinfo: ", meetInfo["nameList"][i]);
    if (nameL.indexOf("\n") > 0){
      let nameArr = nameL.split("\n");
      console.log("Name: ", nameArr[0]);
      console.log("Data: ", nameArr[1]);
    }
    
  }
  
}
async function grabMeets(page){
  let nameList = await page.evaluate(() => Array.from(document.querySelectorAll('li.evenRow, li.oddRow'), element => element.children[1].innerText));
  let nameListAddress = await page.evaluate(() => Array.from(document.querySelectorAll('li.evenRow, li.oddRow'), element => element.children[2].children[0].querySelector('td:nth-of-type(2) > span').innerText));
  
  let namesArr = [];
  for (i=0; i<nameList.length; i++){
    if (nameList[i].indexOf("\n") > 0){
      let meetInfo = nameList[i].split("\n");
      namesArr.push({'name': meetInfo[0], 'date': meetInfo[1]})
    } else {
      namesArr.push(nameList[i]);
    }
  }
  let nameListAddressArr = [];
  for (i=0; i<nameList.length; i++){
    if (nameList[i].indexOf("\n") > 0){
      let meetInfo = nameList[i].split("\n");
      nameListAddressArr.push({'name': meetInfo[0], 'date': meetInfo[1]})
    } else {
      nameListAddressArr.push(nameListAddressArr[i]);
    }
  }
  console.log("NameList: ", namesArr);
  let info = {'nameList': nameList, 'address': nameListAddress};
  return info;

  console.log("Address: ", nameListAddress);
  console.log("Number: ", nameList.length);
  if (nameList[0].indexOf('\n') > 0) {
    let nameArr = nameList[0].split("\n");
    console.log("Text 1: ", nameArr[0]);
    console.log("Text 2: ", nameArr[1]);
    console.log("Address: ", nameListAddress[0]);
  }
  
}

