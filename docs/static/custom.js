const gitalk = new Gitalk({
    clientID: '78e34bb02c5fb25c725a',
    clientSecret: '43de20bafaed0534c3a78435c1f5460f3848de21',
    repo: 'note',
    owner: 'xu-ux',
    admin: ['xu-ux'],
    title: 'comment-'+location.pathname,
    id: md5(location.pathname),
    // facebook-like distraction free mode
    distractionFreeMode: false
})

// 一言
function getYiYan(){
    fetch('https://v1.hitokoto.cn').then(response => response.json()).then(function(json) {
        $("#yiyan").fadeIn(500);
        $('#yiyan').text(`${json.hitokoto} —— ${json.from}`);
        setTimeout(()=>{$("#yiyan").fadeOut(500)},5000)
    })
}
setInterval(getYiYan,6000);

// 添加网站运行时间统计
function siteTime() {
    window.setTimeout("siteTime()", 1000);
    let seconds = 1000;
    let minutes = seconds * 60;
    let hours = minutes * 60;
    let days = hours * 24;
    let years = days * 365;
    let today = new Date();
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth() + 1;
    let todayDate = today.getDate();
    let todayHour = today.getHours();
    let todayMinute = today.getMinutes();
    let todaySecond = today.getSeconds();
    let t1 = Date.UTC(2020, 1, 24, 8, 10, 59);
    let t2 = Date.UTC(todayYear, todayMonth, todayDate, todayHour, todayMinute, todaySecond);
    let diff = t2 - t1;
    let diffYears = Math.floor(diff / years);
    let diffDays = Math.floor((diff / days) - diffYears * 365);
    let diffHours = Math.floor((diff - (diffYears * 365 + diffDays) * days) / hours);
    let diffMinutes = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours) / minutes);
    let diffSeconds = Math.floor((diff - (diffYears * 365 + diffDays) * days - diffHours * hours - diffMinutes * minutes) / seconds);
    document.getElementById("sitetime").innerHTML = " 本站已运行 " + diffYears + " 年 " + diffDays + " 天 " + diffHours + " 小时 " + diffMinutes + " 分 " + diffSeconds + " 秒 ";
}
siteTime();