import React from 'react';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString().substring(0,10)
        };
        
        this.updateDate = this.updateDate.bind(this);
        this.changeEmotion = this.changeEmotion.bind(this);
    }

    async componentDidMount() {
        const uuid = sessionStorage.getItem('User_Key');
        const result = await fetch(`http://localhost:5000/getCurrentInfo?uuid=${uuid}&date=${this.state.date}`)
        .then(response => response.json())
        .then(data => data);

        if(result === false) {
            sessionStorage.clear();
            this.props.changePage('login');
            return;
        }

        const select = document.getElementById('dropDown');
        select.selectedIndex = result.emotion - 1;
        this.updateBackroundColor(result.emotion - 1);
    }

    updateBackroundColor(emotionIndex) {
        const sideNav = document.getElementById('sideNav');

        let color;
        switch(emotionIndex) {
            case 0: color = "#ffadad";break;
            case 1: color = "#ffd6a5";break;
            case 2: color = "#caf0f8";break;
            case 3: color = "#caffbf";break;
            case 4: color = "#83e377";break;
        }

        sideNav.style.backgroundColor = color;
    }

    async updateDate(e) {
        const newDate = e.currentTarget.value;
        await this.setState({
            date: newDate
        });
        alert(this.state.date);
    }

    async changeEmotion() {
        const select = document.getElementById('dropDown');
        const selectedIndex = select.selectedIndex;

        const uuid = sessionStorage.getItem('User_Key');

        const result = await fetch(`http://localhost:5000/updateMood`,{
            method: 'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({
                uuid,
                'moodIndex': selectedIndex,
                'date': this.state.date
            })
        })
        .then(response => response.json())
        .then(data => data.response);

        if(result === false) {
            alert('Something went wrong!');
            return;
        }

        this.updateBackroundColor(selectedIndex);
    }

    render() {
        return(
            <div className="main_page">
                <div className="side_nav" id="sideNav">
                    <input type="date" name="calendar" id="calendar" 
                    defaultValue={this.state.date} onChange={this.updateDate}/><br />
                    <select className="drop_down" id="dropDown"
                    onChange={this.changeEmotion}>
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