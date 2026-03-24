import { useState } from "react";
import "../css/mvp.css";
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        setValues((prev) => {
            let { u, i, r, p } = prev;

            // alles in Zahlen umwandeln (sonst rechnest du mit Strings… viel Spaß damit)
            u = u === "" ? "" : Number(u);
            i = i === "" ? "" : Number(i);
            r = r === "" ? "" : Number(r);
            p = p === "" ? "" : Number(p);

            // Fälle aus beiden Branches kombiniert
            if (i === "" && r === "") {
                i = p / u;
                r = (u * u) / p;
            } else if (i === "" && p === "") {
                i = u / r;
                p = (u * u) / r;
            } else if (r === "" && p === "") {
                r = u / i;
                p = u * i;
            } else if (u === "" && i === "") {
                u = Math.sqrt(p * r);
                i = Math.sqrt(p / r);
            } else if (u === "" && r === "") {
                u = p / i;
                r = p / (i * i);
            } else if (u === "" && p === "") {
                u = i * r;
                p = i * i * r;
            }

            return { u, i, r, p };
        });
    };

    return (
        <section>
            <header>
                <h2>Formelrad</h2>
                <img src={formelrad} width="200" alt="Formelrad" />
            </header>

            <form onSubmit={handleSubmit}>
                <InputField
                    color="black"
                    value={values.u}
                    label="Spannung"
                    handleChange={(e) =>
                        setValues((v) => ({ ...v, u: e.target.value }))
                    }
                />
                <InputField
                    color="black"
                    value={values.i}
                    label="Stromstärke"
                    handleChange={(e) =>
                        setValues((v) => ({ ...v, i: e.target.value }))
                    }
                />
                <InputField
                    color="black"
                    value={values.r}
                    label="Widerstand"
                    handleChange={(e) =>
                        setValues((v) => ({ ...v, r: e.target.value }))
                    }
                />
                <InputField
                    color="black"
                    value={values.p}
                    label="Leistung"
                    handleChange={(e) =>
                        setValues((v) => ({ ...v, p: e.target.value }))
                    }
                />
                <button type="submit">Calculate</button>
            </form>
        </section>
    );
}