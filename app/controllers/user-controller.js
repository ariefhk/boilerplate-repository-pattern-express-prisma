const { userService } = require("../services");
const { ApplicationError } = require("../errors");

const authorize = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken)
            throw new ApplicationError(400, "required authorization!");

        const usePayload = await userService.authorize(bearerToken);
        req.user = usePayload;

        next();
    } catch (err) {
        if (err instanceof ApplicationError) {
            res.status(err.statusCode).json({
                status: "FAIL",
                message: err.message,
            });
            return;
        }
        res.status(500).json({
            status: "FAIL",
            message: "Server Error!",
        });
    }
};

const whoAmI = (req, res) => {
    const userPayload = req.user; //from authorization
    res.status(200).json({
        status: "OK",
        message: "Success",
        data: {
            name: userPayload.name,
            code: userPayload.code,
        },
    });
};

const login = async (req, res) => {
    try {
        const code = req.body.code;
        if (!code)
            throw new ApplicationError(400, `user code can't be empty !`);

        const userLoginPayload = await userService.login(code);

        res.status(200).json({
            status: "OK",
            message: "Success",
            data: {
                name: userLoginPayload.name,
                token: userLoginPayload.token,
            },
        });
    } catch (err) {
        if (err instanceof ApplicationError) {
            res.status(err.statusCode).json({
                status: "FAIL",
                message: err.message,
            });
            return;
        }
        res.status(500).json({
            status: "FAIL",
            message: "Server Error!",
        });
    }
};

const register = async (req, res) => {
    try {
        const name = req.body.name;
        const code = req.body.code;
        if (!code && !name)
            throw new ApplicationError(
                400,
                `user code & name can't be empty !`
            );
        if (!code)
            throw new ApplicationError(400, `user code can't be empty !`);
        if (!name)
            throw new ApplicationError(400, `user name can't be empty !`);
        if (String(code).length < 4)
            throw new ApplicationError(400, `minimum user code length is 4 !`);

        const userRegisPayload = await userService.register(name, code);

        res.status(201).json({
            status: "OK",
            message: "Success",
            data: {
                name: userRegisPayload.name,
                code: userRegisPayload.code,
            },
        });
    } catch (err) {
        if (err instanceof ApplicationError) {
            res.status(err.statusCode).json({
                status: "FAIL",
                message: err.message,
            });
            return;
        }
        res.status(500).json({
            status: "FAIL",
            message: "Server Error!",
        });
    }
};

module.exports = {
    authorize,
    whoAmI,
    login,
    register,
};
