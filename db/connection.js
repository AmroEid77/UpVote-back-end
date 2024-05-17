import mongoose from 'mongoose';

const connectDb = () => {
    mongoose.connect(process.env.DB)
        .then(() => {
            console.log('DB connected')
        }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
}
export default connectDb