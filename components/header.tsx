import Link from "next/link";
import { Button } from "@mui/material";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import Grid from "@mui/material/Grid";

type HeaderProps = {
  user?: any;
  loading: boolean;
};

const Header = ({ user, loading }: HeaderProps) => {
  return (
    <header>
      <Grid container>
        <Grid item xs={3}>
          <nav>
            <ul></ul>
          </nav>
        </Grid>
        <Grid item xs={6}>
          <nav>
            <ul>
              <li>
                <Link href="/" legacyBehavior>
                  <a>Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about" legacyBehavior>
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/advanced/api-profile" legacyBehavior>
                  <a>API rendered profile (advanced)</a>
                </Link>
              </li>
              {!loading &&
                (user ? (
                  <>
                    <li>
                      <Link href="/profile" legacyBehavior>
                        <a>Client rendered profile</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/advanced/ssr-profile" legacyBehavior>
                        <a>Server rendered profile (advanced)</a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <></>
                ))}
            </ul>
          </nav>
        </Grid>
        <Grid item xs={3}>
          <nav>
            {!loading &&
              (user ? (
                <ul>
                  <li style={{ marginLeft: "auto" }}>
                    <Button
                      sx={{ border: "1px solid #ffa700", color: "#ff4c4cdb" }}
                      variant="outlined"
                      endIcon={<BiLogOut />}
                      href="/api/auth/logout"
                    >
                      Logout
                    </Button>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li style={{ marginLeft: "auto" }}>
                    <Button
                      sx={{ border: "1px solid #ffa700", color: "#19d29ecc" }}
                      variant="outlined"
                      endIcon={<BiLogIn />}
                      href="/api/auth/login"
                    >
                      Login
                    </Button>
                  </li>
                </ul>
              ))}
          </nav>
        </Grid>
      </Grid>
      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #271542;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
          padding-right: 2rem;
        }
        li:nth-child(3) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  );
};

export default Header;
