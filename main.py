from ephemeris import save_to_json, get_elongation
import argparse
import json
import datetime

def load_config():
    with open("config.json", "r") as f:
        return json.load(f)

def save_config(config):
    with open("config.json", "w") as f:
        json.dump(config, f)

parser = argparse.ArgumentParser()
parser.add_argument("--set", nargs=3, metavar=('Y', 'M', 'D'), help="Set date")
parser.add_argument("--forward", type=int, help="Advance days")
parser.add_argument("--elongation", metavar="PLANET", help="Show elongation of a planet")
args = parser.parse_args()

config = load_config()
current_date = datetime.date.fromisoformat(config["date"])

if args.set:
    y, m, d = map(int, args.set)
    current_date = datetime.date(y, m, d)
    config["date"] = str(current_date)
    save_config(config)
    print("Date set.")

if args.forward:
    current_date += datetime.timedelta(days=args.forward)
    config["date"] = str(current_date)
    save_config(config)
    print(f"Forwarded to {current_date}")

if args.elongation:
    try:
        elong = get_elongation(current_date, args.elongation)
        print(f"{args.elongation.capitalize()} elongation on {current_date}: {elong:.2f}°")
    except ValueError as e:
        print(e)

save_to_json(current_date)