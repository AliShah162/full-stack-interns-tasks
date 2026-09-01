// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
});

// Address Schema
const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    zipCode: String
});

// Finding a user WITHOUT populate
const user = await User.findById('user123');
console.log(user);
// Output:
{
    "_id": "user123",
    "name": "John",
    "addressId": "addr456"  // ! Just an ID, not helpful!
}

// To get address, you need ANOTHER query:
const address = await Address.findById(user.addressId);
console.log(address);
// {
//     "_id": "addr456",
//     "street": "123 Main St",
//     "city": "NYC"
// }


// With Populate (You get the actual data):
// Finding a user WITH populate
const userNew = await User.findById('user123').populate('addressId');
console.log(user);
// Output:
{
    "_id": "user123",
    "name": "John",
    "addressId": {  // ✅ Now it has the actual address data!
        "_id": "addr456",
        "street": "123 Main St",
        "city": "NYC",
        "zipCode": "10001"
    }
}

// One query, all data! 🎉