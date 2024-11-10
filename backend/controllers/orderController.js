import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order for frontend
const placeOrder = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
  
      const newOrder = new orderModel({
        userId,
        items,
        amount,
        address
      });
      
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
  
      res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error placing order" });
    }
  };

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success==="true") {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})   
    }
}

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removeOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: true, message: "Order removed successfully" });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: "Error removing order" });
    }
  };

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus,removeOrder}