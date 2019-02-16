import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TitleComponent from "./TitleComponent";
import ArticleComponent from "./ArticleComponent";
import { connect } from "react-redux";
import { setTopic } from "../redux/topics-reducer";
import Grid from "@material-ui/core/Grid";

/* API URL for request */
var url =
    "https://newsapi.org/v2/top-headlines?" +
    "country=us&" +
    "apiKey=9e6c4875383b47c19201e7694edc4eb7";
var req = new Request(url);

// function isConservative(art) {
//     console.log("LOOK HERE BUDDY!!   " + art)
//     if (art.source.id == "the-washington-post") {
//         console.log("true");
//         return true;
//     }
//     return false;
// }

/* State Configuration */
export class ContentComponent extends React.Component {
    constructor(props) {
        console.log("CONTENTCOMPONENT INSTANTIATED");
        super(props);
        this.state = {
            totalResults: null,
            loading: false,
            articles: undefined
            // contentTopic: ""
        };
    }

    componentWillReceiveProps = nextProps => {
        // console.log(nextProps);
        this.setState({ contentTopic: nextProps.topic, loading: true });
    };

    componentDidMount = () => {
        // console.log("actual fetch url: " + req.url + "&q=" + this.props.topic);
        // console.log(this.props);
        fetch(req.url + "&q=" + this.state.contentTopic)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    totalResults: data.totalResults,
                    articles: data.articles,
                    loading: false
                })
            );
    };

    componentDidUpdate = () => {
        if (this.state.loading) {
            console.log(
                "actual fetch url: " + req.url + "&q=" + this.state.contentTopic
            );
            console.log(this.props);
            fetch(req.url + "&q=" + this.props.topic)
                .then(response => response.json())
                .then(data =>
                    this.setState({
                        totalResults: data.totalResults,
                        loading: false,
                        articles: data.articles
                    })
                );
        }
    };

    render() {
        // console.log(this.state.articles);
        // console.log(req.url + "&q=" + this.props.topic);
        let topic = this.props.topic;
        // console.log(topic);
        // console.log(this.state.articles);
        // let libArticles;
        // let consArticles;
        // let allArticles = this.state.articles;
        // if (!this.state.articles === undefined || !this.state.articles == 0) {
        //     console.log(this.state.articles[0]);
        //     console.log("YEET" + this.state.articles)

        //     for (var i = 0; i < allArticles.length; i++) {
        //         if (isConservative(allArticles[i])) {
        //             consArticles.unshift(allArticles[i]);
        //             return;
        //         }
        //         libArticles.unshift(allArticles[i]);
        //     }

        // }
        return (
            <React.Fragment>
                <TitleComponent topic={topic} />
                {/* NOTE: CERTAIN INFO WON'T APPEAR IF THE API DOES NOT RETURN A VALUE */}
                <Grid container>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        {this.state.totalResults && (
                            <Typography variant="subtitle1" style={{ textAlign: "right" }}>
                                Hits: {this.state.totalResults}
                            </Typography>
                        )}
                        <Button
                            variant="outlined"
                            onClick={() => {
                                this.setState({ loading: true });
                            }}
                        >
                            {" "}Refresh{" "}
                        </Button>
                    </Grid>

                    <Grid item xs={6} style={{ marginTop: 5 }}>
                        {this.state.articles &&
                            this.state.articles.map(art => (
                                <ArticleComponent
                                    article={art}
                                    className="lib-news-container"
                                    key={this.state.articles.indexOf(art)}
                                />
                            ))}
                    </Grid>

                    <Grid item xs={6} style={{ marginTop: 5 }}>
                        {this.state.articles &&
                            this.state.articles.map(art => (
                                <ArticleComponent
                                    article={art}
                                    className="cons-news-container"
                                    key={this.state.articles.indexOf(art)}
                                />
                            ))}
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        topic: state.topic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTopic: topic => {
            setTopic(topic)(dispatch);
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentComponent);
