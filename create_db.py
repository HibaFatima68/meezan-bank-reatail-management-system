import oracledb

connection = oracledb.connect(
    user="C##dbproject",
    password="123",
    dsn="DESKTOP-3PG8SO1:1521/orcl"   # OR service name
)

cursor = connection.cursor()

cursor.execute("""CREATE USER C##dbproj IDENTIFIED BY 123""")

cursor.execute("GRANT CONNECT, RESOURCE TO C##dbproj")

print("Oracle schema (user) 'C##dbproj' created successfully.")

cursor.close()
connection.close()

    