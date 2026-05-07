import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
/**
 * Logger
 */
class ConsoleLogger {
  log(message) {
    console.log(message);
  }
}

/**
 * Repository
 */
class UserRepository {
  findByEmail(email) {
    const users = [
      {
        email: "test@test.com",
        password: "1234",
      },
    ];

    return users.find((user) => user.email === email);
  }
}

/**
 * Service
 */
class AuthService {
  constructor(userRepository, logger) {
    this.userRepository = userRepository;
    this.logger = logger;
  }

  login(email, password) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("회원이 존재하지 않습니다.");
    }

    if (user.password !== password) {
      throw new Error("비밀번호가 틀렸습니다.");
    }

    this.logger.log(`${email} 로그인 성공`);

    return {
      accessToken: "dummy-token",
    };
  }
}

/**
 * DI
 */
const logger = new ConsoleLogger();

const userRepository = new UserRepository();

const authService = new AuthService(userRepository, logger);

/**
 * API
 */
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;

    const result = authService.login(email, password);

    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
