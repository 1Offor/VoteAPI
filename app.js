// const express = require('express');
// const app = express();
// const port = 3000;

// app.use(express.json());

// let parties = {
//     APC: { name: 'APC', votes: 142820, candidate: 'Offor' },
//     PDP: { name: 'PDP', votes: 190540, candidate: 'Chicobi' },
//     LP: { name: 'LP', votes: 346055, candidate: 'Nwabuike' }
// };

// // 1. Create a party
// app.post('/parties', (req, res) => {
//     const { name, candidate } = req.body;
//     if (!name || !candidate) {
//         return res.status(400).send({ message: 
//             'Party name and candidate are required' });
//     }
//     if (parties[name]) {
//         return res.status(400).send({ message: 
//             'Party already exists' });
//     }
//     parties[name] = { name, votes: 0, candidate };
//     res.status(201).send({ message: 'Party created successfully', party: parties[name] });
// });

// // 2. Get all the parties
// app.get('/parties', (req, res) => {
//     res.send(Object.values(parties));
// });

// // 3. Get a party by name
// app.get('/parties/:name', (req, res) => {
//     const { name } = req.params;
//     const party = parties[name];
//     if (!party) {
//         return res.status(404).send({ message: 'Party not found' });
//     }
//     res.send(party);
// });

// // 4. Vote (update vote count)
// //setting: Get*http://localhost:3000/parties/partyname/vote
// app.post('/parties/:name/vote', (req, res) => {
//     const { name } = req.params;
//     const party = parties[name];
//     if (!party) {
//         return res.status(404).send({ message: 'Party not found' });
//     }
//     party.votes += 1;
//     res.send({ message: 'Vote counted', party });
// });

// // 5. Delete a party
// //setting: http://localhost:3000/parties/partyname
// app.delete('/parties/:name', (req, res) => {
//     const { name } = req.params;
//     if (!parties[name]) {
//         return res.status(404).send({ message: 'Party not found' });
//     }
//     delete parties[name];
//     res.status(204).send();
// });

// // 6. Leaderboard with total votes and winner
// //setting: http://localhost:3000/leaderboard
// app.get('/leaderboard', (req, res) => {
//     const leaderboard = Object.values(parties)
//         .sort((a, b) => b.votes - a.votes)
//         .map(party => ({ name: party.name, candidate: party.candidate, votes: party.votes }));
    
    
//     //This line calculates the total number of votes 
//     //by summing up the votes for all parties.
//     const totalVotes = Object.values(parties).reduce((sum, party) => sum + party.votes, 0);
    
//     //This line determines the winner by selecting the party with the highest number of votes from the sorted leaderboard. 
//     //If there are no parties, it sets the winner to null.
//     const winner = leaderboard.length > 0 ? leaderboard[0] : null;
    
//     res.send({
//         totalVotes,
//         winner,
//         leaderboard
//     });
// });

// app.listen(port, () => {
//     console.log(`Voting app listening at http://localhost:${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let parties = {
    APC: { name: 'APC', votes: 142820, candidate: 'Offor' },
    PDP: { name: 'PDP', votes: 190540, candidate: 'Chicobi' },
    LP: { name: 'LP', votes: 346055, candidate: 'Nwabuike' }
};

// 1. Create a party
app.post('/parties', (req, res) => {
    const { parties: name, Candidates: candidate } = req.body;
    if (!name || !candidate) {
        return res.status(400).send({ message: 'Party name and candidate are required' });
    }
    if (parties[name]) {
        return res.status(400).send({ message: 'Party already exists' });
    }
    parties[name] = { name, votes: 0, candidate };
    res.status(201).send({ message: 'Party created successfully', party: parties[name] });
});

// 2. Get all the parties
app.get('/parties', (req, res) => {
    res.send(Object.values(parties));
});

// 3. Get a party by name
app.get('/parties/:name', (req, res) => {
    const { name } = req.params;
    const party = parties[name];
    if (!party) {
        return res.status(404).send({ message: 'Party not found' });
    }
    res.send(party);
});

// 4. Vote (update vote count)
app.post('/parties/:name/vote', (req, res) => {
    const { name } = req.params;
    const party = parties[name];
    if (!party) {
        return res.status(404).send({ message: 'Party not found' });
    }
    party.votes += 1;
    res.send({ message: 'Vote counted', party });
});

// 5. Delete a party
app.delete('/parties/:name', (req, res) => {
    const { name } = req.params;
    if (!parties[name]) {
        return res.status(404).send({ message: 'Party not found' });
    }
    delete parties[name];
    res.status(204).send();
});

// 6. Leaderboard with total votes, winner, and percentage
app.get('/leaderboard', (req, res) => {
    const totalVotes = Object.values(parties).reduce((sum, party) => sum + party.votes, 0);
    const leaderboard = Object.values(parties)
        .sort((a, b) => b.votes - a.votes)
        .map(party => ({
            name: party.name,
            candidate: party.candidate,
            votes: party.votes,
            percentage: totalVotes > 0 ? ((party.votes / totalVotes) * 100).toFixed(2) + '%' : '0%'
        }));
    
    const winner = leaderboard.length > 0 ? leaderboard[0] : null;
    
    res.send({
        totalVotes,
        winner,
        leaderboard
    });
});

app.listen(port, () => {
    console.log(`Voting app listening at http://localhost:${port}`);
});

