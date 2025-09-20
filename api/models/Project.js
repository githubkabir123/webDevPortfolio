const mongoose3 = require('mongoose');


const ProjectSchema = new mongoose3.Schema({
user: { type: mongoose3.Schema.Types.ObjectId, ref: 'User', required: true },
title: String,
description: String,
projectDescription: String,
technologies: [String],
image: String,
src: String,
codeSrc: String,
}, { timestamps: true });


module.exports = mongoose3.model('Project', ProjectSchema);