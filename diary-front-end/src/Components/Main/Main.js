import React from 'react';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString().substring(0,10),
            notes: {}
        };
        
        this.updateDate = this.updateDate.bind(this);
        this.changeEmotion = this.changeEmotion.bind(this);
        this.fetchCurrentInformation = this.fetchCurrentInformation.bind(this);
        this.createNewNote = this.createNewNote.bind(this);
    }

    async fetchCurrentInformation() {
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

        await this.setState({
            notes: result.notes
        });

        this.updateBackroundColor(result.emotion - 1);
    }

    async componentDidMount() {
        await this.fetchCurrentInformation();
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
            default: color = "#caf0f8";break;  
        }

        sideNav.style.backgroundColor = color;
    }

    async updateDate(e) {
        const newDate = e.currentTarget.value;
        await this.setState({
            date: newDate
        });
        
        await this.fetchCurrentInformation();
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

    async createNewNote() {
        var noteName = prompt('Name your note:');
        if(noteName.length < 3) {
            alert('Note name cannot be less than 3 symbols!');
            return;
        }

        const uuid = sessionStorage.getItem('User_Key');
        await fetch('http://localhost:5000/createNote',{
            method:'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({
                noteName,
                uuid,
                'date': this.state.date
            })
        });

        this.fetchCurrentInformation();
    }

    render() {
        const notes = [];
        for(var i = 0; i < Object.keys(this.state.notes).length; i++) {
            const title = this.state.notes[i].Title;
            notes.push(<p key={i} className="note">{title}</p>);
        }

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

                    {notes}
                    
                    <button className="new_note_button" onClick={this.createNewNote}>New Note</button>
                </div>
            </div>
        );
    }
}

export default Main;