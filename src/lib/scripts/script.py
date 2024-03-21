import json
import os
import psycopg2

# Function to create SQL insert statements from JSON data
def json_to_sql(json_data):
    values = ', '.join(
        "('{}', '{}')".format(
            obj['name'].replace("'", "") if obj['name'] is not None else '',
            obj['cou_name_en'].replace("'", "") if obj['cou_name_en'] is not None else ''
        )
        for obj in json_data
    )
    return f"INSERT INTO cities (name, cou_name_en) VALUES {values};"

# Function to export SQL data to a file
def export_to_sql(filename, data):
    with open(filename, 'w') as file:
        file.write(data)

# Function to import SQL data into PostgreSQL database
def import_to_postgres(filename):
    conn = psycopg2.connect(
        dbname="",
        user="",
        password="",
        host="",
        port=""
    )
    cursor = conn.cursor()
    with open(filename, 'r') as file:
        cursor.execute(file.read())
    conn.commit()
    cursor.close()
    conn.close()

# Main function
def main():
    json_file = ''
    chunk_size = 1000  # Adjust this according to your needs
    output_dir = ''

    with open(json_file, 'r') as file:
        data = json.load(file)

    # Split data into chunks
    chunks = [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Export each chunk to SQL files
    for i, chunk in enumerate(chunks):
        sql_data = json_to_sql(chunk)
        sql_filename = os.path.join(output_dir, f'chunk_{i}.sql')
        export_to_sql(sql_filename, sql_data)

    # Import SQL files into PostgreSQL database
    for sql_file in os.listdir(output_dir):
        if sql_file.endswith('.sql'):
            sql_path = os.path.join(output_dir, sql_file)
            import_to_postgres(sql_path)

if __name__ == "__main__":
    main()
