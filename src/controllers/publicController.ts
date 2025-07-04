import { Request, Response } from 'express';

export const listProperties = (req: Request, res: Response) => {
  res.send('List public properties');
};

export const getProperty = (req: Request, res: Response) => {
  res.send(`Get public property ${req.params.id}`);
};

export const inquireProperty = (req: Request, res: Response) => {
  res.send(`Inquire about property ${req.params.id}`);
};

export const searchProperties = (req: Request, res: Response) => {
  res.send('Search public properties');
};

export const getFilters = (req: Request, res: Response) => {
  res.send('Get property filters');
}; 