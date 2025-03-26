module.exports = (schema) => (req, res, next) => {
    const { success, error } = schema.safeParse(req.body);
    
    if (!success) {
        return res.status(400).json({ errors: error.flatten().fieldErrors });
    }

    next();
};
