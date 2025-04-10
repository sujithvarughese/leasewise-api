import Message from "../models/Message.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js"

const createMessage = async (req, res) => {
	// { sender, recipient, subject, body } = req.body
	// validate just in case (schema already validates)
	console.log(req.body)
	if (!req.body.recipient) {
		throw new BadRequestError('please provide recipient')
	}
	if (!req.body.body) {
		throw new BadRequestError('please provide body')
	}
	// if message is a reply, find the previous message and set headNode=false so current message becomes latest message
	if (req.body.previousMessage) {
		await Message.findByIdAndUpdate(req.body.previousMessage, { headNode: false })
	}
	// create new message using Message model
	const message = await Message.create(req.body)

	res.status(StatusCodes.CREATED).json({ message })
}

const getMessages = async (req, res) => {
	// inbox will have messages where latest message sender or recipient is user
	const messages = await Message
		.find({ headNode: true })
		.or([{ recipient: req.user.userID }, { sender: req.user.userID }])
		.sort({ date: -1 })
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	// outbox list of all messages where sender is user
	res.status(StatusCodes.OK)
		.json({
			msg: "Inbox successfully retrieved",
			messages: messages
		})
}


const markMessageRead = async (req, res) => {
	await Message.findByIdAndUpdate(req.body._id, { read: true })
	res.status(StatusCodes.OK)
		.json({ msg: 'message read status update success'})
}

const markMessageUnread = async (req, res) => {

	await Message.findByIdAndUpdate(req.body._id, { read: false })
	res.status(StatusCodes.OK)
		.json({ msg: 'message read status update success'})
}

const toggleFlag = async (req,res) => {
	//  { message } = req.body
	const message = await Message.findById(req.body)
	await Message.findByIdAndUpdate(req.body, { flag: !message.flag})
	res.status(StatusCodes.OK)
		.json({
			msg: 'message flag update success',
		})
}

const getMessage = async (req, res) => {
	// { message } = req.params
	const message = await Message
		.findById(req.params.message)
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	res.status(StatusCodes.OK)
		.json({
			msg: "Message successfully retrieved",
			message: message
		})
}

const getPreviousMessages = async (req, res) => {
	// { message } = req.params
	const previousMessages = []
	// retrieve current message
	let currentMessage = await Message
		.findById(req.params.message)
		.populate({path: "sender recipient", select: "lastName firstName _id"})
	// if current message has previous message, add to array and set current message as previous message
	previousMessages.push(currentMessage)
	while (currentMessage.previousMessage) {
		const previousMessage = await Message
			.findById(currentMessage.previousMessage._id)
			.populate({path: "sender recipient", select: "lastName firstName _id"})
		previousMessages.push(previousMessage)
		currentMessage = previousMessage
	}
	res.status(StatusCodes.OK)
		.json({
			msg: "Previous messages successfully retrieved",
			previousMessages: previousMessages
		})
}

const deleteMessage = async (req, res) => {
	//  { message } = req.body
	console.log(req.params)
	const messageToDelete = await Message.findByIdAndDelete(req.params.message)
	await Message.findByIdAndUpdate(messageToDelete.previousMessage._id, { headNode: true })
	await Message.findByIdAndDelete(req.params.message)

	res.status(StatusCodes.OK).json({ msg: 'message delete success'})
}

export {
	createMessage,
	getMessages,
	markMessageRead,
	markMessageUnread,
	toggleFlag,
	deleteMessage,
	getMessage,
	getPreviousMessages
}