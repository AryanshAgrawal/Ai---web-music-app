leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
status = "";
leftwrist_score = 0;
rightwrist_score = 0;
songhp_status = "";
songpp_status = "";

function preload() {
    songpp = loadSound("music2.mp3");
    songhp = loadSound("music.mp3");

}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modalloaded);
    posenet.on('pose', gotresult);
}
function draw() {
    image(video, 0, 0, 600, 500);
    stroke("red");
    fill("red");
    songhp_status = songhp.isPlaying();
    songpp_status = songpp.isPlaying();
    if (leftwrist_score > 0.2) {
        console.log(leftwrist_score);
        circle(leftwristx, leftwristy, 20);

        songhp.stop();
        if (songpp_status==false) {
            songpp.play();
            document.getElementById("songname").innerHTML = "Playing peterpan song";
        }
    }
    if (rightwrist_score > 0.2) {
        circle(rightwristx, rightwristy, 20);
        console.log(rightwrist_score);
        songpp.stop();
        if (songhp_status==false) {
            songhp.play();
            document.getElementById("songname").innerHTML = "Playing Harry potter song";
        }
    }

}
function modalloaded() {
    console.log("Posenet is Initialized");
}
function gotresult(results) {
    if (results.length > 0) {
        leftwrist_score = results[0].pose.keypoints[9].score;
        rightwrist_score = results[0].pose.keypoints[10].score;
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("leftwristx=" + leftwristx + " leftwristy=" + leftwristy);
        console.log("rightwristx=" + rightwristx + " rightwristy=" + rightwristy);
    }
}