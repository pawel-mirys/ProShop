import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import asyncHandler from '../middleware/asyncHandler.js';
import { OrderType } from '../types/types.js';
import Order from '../models/orderModel.js';

export const addOrderItems = asyncHandler(
  async (req: Request<ParamsDictionary, any, OrderType>, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems: orderItems.map((order) => ({
          ...order,
          product: order._id,
          _id: order._id,
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createOrder = await order.save();

      res.status(201).json(createOrder);
    }
  }
);

export const getMyOrders = asyncHandler(
  async (req: Request<ParamsDictionary, any, OrderType>, res: Response) => {
    const orders: OrderType[] = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  }
);

export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const order: OrderType | null = await Order.findById(
      req.params.id
    ).populate('user', 'name email');
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  }
);

export const createNewOrder = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('create order');
  }
);

export const updateOrderToPaid = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('update order: paid');
  }
);

export const updateToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('update to deliverd');
  }
);

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('get all orders');
  }
);
