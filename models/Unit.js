import mongoose from 'mongoose'

const UnitSchema = new mongoose.Schema( {
	account: {
		type: mongoose.Types.ObjectId,
		ref: "Account"
	},
	houseNumber: {
		type: String,
		required: [true, "Please provide house number"]
	},
	street: {
		type: String,
		required: [true, "Please provide street"]
	},
	apartmentNumber: {
		type: String,
	},
	city: {
		type: String,
		required: [true, "Please provide city"]
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: [true, "Please provide zip"]
	},
	image: {
		type: String,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: 'User'
	},
	finances: {
		type: mongoose.Types.ObjectId,
		ref: "Finance"
	},
	bedrooms : {
		type: Number,
	},
	bathrooms: {
		type: Number,
	},
	tenant: {
		lastName: String,
		firstName: String,
		email: String,
		phone: String,
		rent: Number
	},
	accounting: {
		purchasePrice: Number,
		rent: Number,
		fairMarketRent: Number,
		annualPropertyTax: Number,
		insurance: {
			company: String,
			agent: String,
			phone: String,
			email: String,
			annualPremium: Number,
			coverage: String
		},
		mortgage: {
			bank: String,
			principal: Number,
			interest: Number,
			term: Number,
			paymentsMade: Number
		},
		hoa: {
			association: String,
			agent: String,
			phone: String,
			email: String,
			annualFee: Number
		}
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	}
}, { timestamps: true })


export default mongoose.model('Unit', UnitSchema)