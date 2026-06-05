fetch("https://codeforces.com/api/contest.list")
    .then(data => data.json())
    .then(constestData => {
        for (let i = 0; i < 15; i++) {
            if (constestData.result[i].phase === "BEFORE") {
                const contestName = constestData.result[i].name;

                const unixTimestamp = constestData.result[i].startTimeSeconds;
                const date = new Date(unixTimestamp * 1000);

                const contestTime = date.toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                });

                const codeforces = document.getElementById("codeforces");
                const time = document.getElementById("time");

                codeforces.innerHTML = contestName;
                time.innerHTML = contestTime;
            }
        }
    })
    .catch(function (err) {
        console.log(err);
    });