import * as React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import {ProductListContainer} from './components/productListContainer'

const apolloClient = new ApolloClient({
    uri: 'http://localhost:5000/graphql'
});

class App extends React.Component {
    public render() {
        return (
            <ApolloProvider client={apolloClient}>
                <BrowserRouter>
                    <div className="App">
                        <header className="App-header">
                            <img src="https://media.giphy.com/media/KRVtDNdpRxT0Y/giphy.gif" className="App-logo" alt="logo" />
                            <h1 className="App-title">Welcome to Pizza Store</h1>
                        </header>
                        <div className="App-intro">
                            <ProductListContainer/>
                        </div>
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default App;
