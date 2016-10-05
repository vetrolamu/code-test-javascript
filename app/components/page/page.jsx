import React from 'react';

import Header from '../header/header.jsx';
import Game from '../game/game.jsx';

import './page.scss';

const Page = React.createClass({
    render() {
        return (
            <main className="page">
                <Header />
                <Game />
            </main>
        );
    }
});

export default Page;
