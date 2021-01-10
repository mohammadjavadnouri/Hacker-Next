const react = require("react");
import fetch from "isomorphic-fetch";
import Error from "next/error";
import Link from "next/link";
import Head from "next/head";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";

class Index extends react.Component {
  static async getInitialProps({ req, res, query }) {
    let stories;
    let page;
    try {
      page = Number(query.page) || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    return { stories, page };
  }

  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <>
        <Head>
          <link rel="manifest" href="../static/manifest.json" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="hacker-next" />
          <meta name="apple-mobile-web-app-title" content="hacker-next" />
          <meta name="theme-color" content="#f60" />
          <meta name="msapplication-navbutton-color" content="#f60" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/static/icons/icon-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512x512"
            href="/static/icons/icon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/static/icons/icon-192x192.png"
          />
        </Head>
        <Layout
          title="Hacker Next"
          description="A Hacker News Clone made with Nextjs"
        >
          <StoryList stories={stories} />

          <footer>
            <Link href={`/?page=${page + 1}`}>
              <a>Next Page ({page + 1})</a>
            </Link>
          </footer>
          <style jsx>{`
            footer {
              padding: 1em;
            }
            footer a {
              font-weight: bold;
              color: black;
              text-decoration: none;
            }
          `}</style>
        </Layout>
      </>
    );
  }
}

export default Index;
