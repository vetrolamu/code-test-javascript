import React from 'react';

import Game from '../game/game.jsx';

import './page.scss';

const Page = React.createClass({
    render() {
        return (
            <main className="page">
                <Game />
            </main>
        );
    }
});

export default Page;
