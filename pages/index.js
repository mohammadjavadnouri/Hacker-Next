const react = require("react");
import fetch from 'isomorphic-fetch'
import Error from 'next/error';

class Index extends react.Component {
    
    static async getInitialProps() {
        let stories;
        try{
            const response = await fetch('https://node-hnapi.herokuapp.com/news?page=1');
            stories = await response.json();
        } catch (err) {
            console.log(err);
            stories = [];
        }

        return {stories}
    }

    render(){
        const {stories} = this.props;

        if(stories.length === 0){
            return(
                <Error statusCode={503}/>
            )
        }

        return(
            <div>
                <h1>Hacker next</h1>
                <div>{stories.map(story =>(
                    <h4 key={story.id}>{story.title}</h4>
                ) )}</div>
            </div>
        )
    }
}


export default Index;