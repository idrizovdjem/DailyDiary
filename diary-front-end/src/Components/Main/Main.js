import React from 'react';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.date = new Date().toISOString().substring(0,10);
    }

    componentDidMount() {
        this.updateBackroundColor();
    }

    updateBackroundColor() {
        const sideNav = document.getElementById('sideNav');
        const currentEmotion = document.getElementById('dropDown').value;
        let color;
        switch(currentEmotion) {
            case "Terrible": color = "#ffadad";break;
            case "Not Good": color = "#ffd6a5";break;
            case "Average": color = "#caf0f8";break;
            case "Very Good": color = "#caffbf";break;
            case "Excellent": color = "#83e377";break;
        }

        sideNav.style.backgroundColor = color;
    }

    render() {
        return(
            <div className="main_page">
                <div className="side_nav" id="sideNav">
                    <input type="date" name="calendar" id="calendar" defaultValue={this.date}/><br />
                    <select defaultValue="Average" className="drop_down" id="dropDown"
                    onChange={this.updateBackroundColor}>
                        <option>Terrible</option>
                        <option>Not Good</option>
                        <option>Average</option>
                        <option>Very Good</option>
                        <option>Excellent</option>
                    </select>
                    <h2>Notes:</h2>

                    <p className="note">This is note with very long title.
                    This is getting ridiculous</p>
                    <p className="note">This is note with very long title.
                    This is getting ridiculous</p>
                    <p className="note">This is note with very long title.
                    This is getting ridiculous</p>
                    
                    <button className="new_note_button">New Note</button>
                </div>
            </div>
        );
    }
}

export default Main;