import { tweetsData } from "./data.js"

const myData = tweetsData

const bodySection = document.getElementById("body")
const newTweet = document.getElementById("new-tweet")

function createTweet() {
    let tweetToRender = ``

    myData.forEach(tweet => {
        let replyTweet = ``

        let showReply = tweet.replied ? "show" : ""
        let replyClass = tweet.replied ? "fa-solid" : ""
        let likeClass = tweet.isLiked ? "fa-solid" : ""
        let retweetClass = tweet.isRetweeted ? "retweeted" : ""
        let verifiedClass = tweet.isVerified ? "true" : ""

        tweet.replies.forEach(reply => {

            replyTweet += `
                    <div class="reply flex">
                        <img src="./${reply.profilePic}" class="user-img">
                        <h5 class="user-name flex">
                            ${reply.handle}
                            <img src="./images/Verified_Badge.svg.png" class="verified-user ${verifiedClass}">
                        </h5>
                        <p class="user-tweet">
                            ${reply.tweetText}
                        </p>
                    </div>                            
            `
        })

        tweetToRender += `
                <div class="tweet flex">
                    <img src="./${tweet.profilePic}" class="user-img">
                    <h5 class="user-name flex">
                        ${tweet.handle}
                        <img src="./images/Verified_Badge.svg.png" class="verified-user ${verifiedClass}">
                    </h5>
                    <p class="user-tweet">
                        ${tweet.tweetText}
                    </p>
                    <div class="icons-container flex">
                        <i 
                            class="fa-regular fa-comment-dots ${replyClass}" 
                            data-comment="${tweet.uuid}"
                            >
                            <span class="comment-value">
                                ${tweet.replies.length}
                            </span>
                        </i>

                        <i 
                            class="fa-regular fa-heart ${likeClass}"
                            data-like="${tweet.uuid}"
                            >
                            <span class="like-value">
                                ${tweet.likes}
                            </span>
                        </i>

                        <i 
                            class="fa-solid fa-retweet ${retweetClass}"
                            data-retweet="${tweet.uuid}"
                            >
                            <span class="retweet-value">
                                ${tweet.retweets}
                            </span>
                        </i>
                    </div>

                    <div class="replies flex ${showReply}">
                        ${replyTweet}

                        <div class="new-reply-container flex">
                            <textarea 
                                class="new-reply" 
                                id="${tweet.uuid}"
                                placeholder="Reply..."
                            ></textarea>
                            <button class="reply-btn" data-id=${tweet.uuid}>Reply</button>
                        </div>
                    </div>
                   
                </div>
            `
    })

    return tweetToRender
}

function render() {
    bodySection.innerHTML = createTweet()
}

render()

document.addEventListener("click", function (e) {
    if (e.target.dataset.comment) {
        // console.log(e.target.dataset.comment)
        handleReplyClick(e.target.dataset.comment)

    } else if (e.target.dataset.like) {
        // console.log(e.target.dataset.like)
        handleLikeClick(e.target.dataset.like)

    } else if (e.target.dataset.retweet) {
        // console.log(e.target.dataset.retweet)
        handleRetweetClick(e.target.dataset.retweet)

    } else if (e.target.id === "tweet-btn") {
        // console.log("Button clicked")
        handleTweetButton()
    } else if (e.target.dataset.id) {
        console.log(e.target.dataset.id)
        // reply button id
    }
})

function handleLikeClick(tweetID) {
    const tweetObject = myData.filter(tweet => {
        return tweet.uuid === tweetID
    })[0]

    tweetObject.isLiked = !tweetObject.isLiked

    tweetObject.isLiked ? tweetObject.likes++ : tweetObject.likes--

    render()
}

function handleRetweetClick(tweetID) {
    const tweetObject = myData.filter(tweet => {
        return tweet.uuid === tweetID
    })[0]

    tweetObject.isRetweeted = !tweetObject.isRetweeted

    tweetObject.isRetweeted ? tweetObject.retweets++ : tweetObject.retweets--

    render()
}

function handleReplyClick(tweetID) {
    const tweetObject = myData.filter(tweet => {
        return tweet.uuid === tweetID
    })[0]

    tweetObject.replied = !tweetObject.replied

    render()
}

function handleTweetButton() {
    if (newTweet.value) {
        let idNumber = myData.length + 1
        let newText = newTweet.value
        let newTweetObject =
        {
            handle: `@Dan Abramov`,
            profilePic: `./images/Dan.JPEG`,
            likes: 0,
            retweets: 0,
            tweetText: newText,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            replied: false,
            isVerified: true,
            uuid: `${idNumber}`,
        }

        myData.push(newTweetObject)
        newTweet.value = ""
        render()
    }
}

function capitalizeFirstLetter() {
    let text = newTweet.value;
    if (text.length > 0) {
        text = text.charAt(0).toUpperCase() + text.slice(1);
        newTweet.value = text;
    }
}
newTweet.addEventListener("input", capitalizeFirstLetter)