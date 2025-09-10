import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaHeart,
    FaGift,
    FaHandHoldingUsd,
    FaMapMarkedAlt,
    FaPaperPlane,
} from 'react-icons/fa';

import ProductCard from '../../components/ProductCard';
import homeLogo from '../../assets/images/ubl-logo.png';
import './home.scss';


interface HomeProps {
    setUserInput: (input: string) => void;
}

const Home = ({ setUserInput }: HomeProps) => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const suggestionCards = [
        {
            title: 'Add Two Numbers in Python',
            description: 'Write Python code to add two numbers.',
            icon: <FaHeart size={20} />,
        },
        {
            title: 'Extract All Employees (SQL)',
            description: 'Write sql query to extract all employees',
            icon: <FaGift size={20} />,
        },
        {
            title: 'Generate Random Numbers in Python',
            description: 'Write python code to generate random numbers',
            icon: <FaHandHoldingUsd size={20} />,
        },
        {
            title: 'Get Latest Data Entry (SQL)',
            description: 'Write sql query to get latest data entry in db',
            icon: <FaMapMarkedAlt size={20} />,
        },
    ];


    const handleCardClick = (description: string) => {
        setInput(description);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (input.trim()) {
            setUserInput(input);
            navigate('/conversation');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="home-page-container">
            <header className="home-header text-center">
                <img src={homeLogo} className="logo-img" alt="Company Logo" />
                <h1 className="mt-3">Hello, I'm your dedicated coding agent</h1>
                <p className="lead text-muted">How can I assist you today?</p>
            </header>

            <div className="chat-input-section mt-5">
                <div className="container">
                    <form onSubmit={handleSubmit} className="chat-input-wrapper border border-secondary rounded shadow-sm">
                        <input
                            type="text"
                            className="chat-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Send a message..."
                        />
                        <button disabled={!input.trim()} type="submit" className="btn-icon" aria-label="Send message">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>

            <main className="container flex-grow-1 mt-2">
                <div className="row g-4 justify-content-center suggestion-cards">
                    {suggestionCards.map((card, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-3 d-flex">
                            <div className="suggestion-card-wrapper" onClick={() => handleCardClick(card.description)}>
                                <ProductCard
                                    title={card.title}
                                    description={card.description}
                                    icon={card.icon}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;