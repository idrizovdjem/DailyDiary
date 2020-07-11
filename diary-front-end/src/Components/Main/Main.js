import React from 'react';
import './Main.css';
import saveIcon from '../Images/save.png';
import binIcon from '../Images/bin.png';
import logoutIcon from '../Images/logout.png';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().toISOString().substring(0,10),
            notes: {},
            activeNote: {}
        };
        
        this.updateDate = this.updateDate.bind(this);
        this.changeEmotion = this.changeEmotion.bind(this);
        this.fetchCurrentInformation = this.fetchCurrentInformation.bind(this);
        this.createNewNote = this.createNewNote.bind(this);
        this.selectNote = this.selectNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    // get the uuid and make request to the server
    // retrieving emotion and notes for the selected date.
    async fetchCurrentInformation() {
        const uuid = sessionStorage.getItem('User_Key');
        const result = await fetch(`http://localhost:5000/getCurrentInfo?uuid=${uuid}&date=${this.state.date}`)
        .then(response => response.json())
        .then(data => data);

        // if something has failed
        // clear the sessionStorage and logout the user
        if(result === false) {
            sessionStorage.clear();
            this.props.changePage('login');
            return;
        }

        // change the dropdown menu selected value
        const select = document.getElementById('dropDown');
        select.selectedIndex = result.emotion - 1;

        // set the fetched notes
        // and clear the active one
        await this.setState({
            notes: result.notes,
            activeNote: {}
        });

        const textBox = document.getElementById('textBox');
        textBox.value = '';
        textBox.disabled = true;

        const noteTitleBox = document.getElementById('noteName');
        noteTitleBox.value = '';
        noteTitleBox.disabled = true;

        this.updateBackroundColor(result.emotion - 1);
    }
    
    async componentDidMount() {
        await this.fetchCurrentInformation();
    }

    // change the sidenav background color
    // depending on the selected emotion
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

    // get the selected date and update it
    async updateDate(e) {
        const newDate = e.currentTarget.value;
        await this.setState({
            date: newDate
        });

        // retrieve relevant information for the selected date
        await this.fetchCurrentInformation();
    }

    // get the selected mood, uuid, date and makes request
    // to update the current date mood
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

    // get the new note name, validate it and make request to the server
    async createNewNote() { 
        var noteName = prompt('Name your note:');
        if(noteName === null || noteName.length < 3) {
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

    // change the active note
    async selectNote(e) {
        const title = e.target.innerText;
        const note = this.state.notes.find(el => el.title === title);
        await this.setState({
            activeNote: note
        });

        const textBox = document.getElementById('textBox');
        textBox.disabled = false;

        if(note.content === undefined) {
            note.content = '';
        }
        textBox.innerText = note.content;

        const noteTitleBox = document.getElementById('noteName');
        noteTitleBox.disabled = false;
        noteTitleBox.value = note.title;
    }

    async deleteNote() {
        if(Object.keys(this.state.activeNote).length === 0) {
            alert('First select note!');
            return;
        }

        var confirm = window.confirm('Are you sure you want to delete this note?');
        if(!confirm) {
            return;
        }

        const noteId = this.state.activeNote.id;
        await fetch('http://localhost:5000/deleteNote',{
            method:'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({noteId})
        });

        await this.fetchCurrentInformation();
    }

    render() {
        const notes = [];
        for(var i = 0; i < Object.keys(this.state.notes).length; i++) {
            const title = this.state.notes[i].title;
            notes.push(<p key={i} className="note" onClick={this.selectNote}>{title}</p>);
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
                <div className="text_field">
                    <div className="top_nav">
                        <input type="text" name="noteName" id="noteName"
                        className="noteTitle"/>
                        <img src={saveIcon} className="icon"/>
                        <img src={binIcon} className="icon" onClick={this.deleteNote}/>
                        <img src={logoutIcon} className="logout" />
                    </div>
                    <textarea className="text_box" id="textBox"></textarea>
                </div>
            </div>
        );
    }
}

export default Main;