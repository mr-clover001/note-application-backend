import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        // Connect to MongoDB with the new defaults
        await mongoose.connect(process.env.MONGO_URI!, {
            serverSelectionTimeoutMS: 50000, // Timeout after 50 seconds
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1); // Exit the process with failure code
    }
};

export default connectDB;