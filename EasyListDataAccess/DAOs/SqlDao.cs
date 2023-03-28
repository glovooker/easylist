using Microsoft.Data.SqlClient;
using System.Data;

namespace EasyListDataAccess.DAOs
{
    public class SqlDao
    {
        private string _connectionString = "";

        private static SqlDao _instance;

        private SqlDao()
        {
            _connectionString = "Data Source=srv-lmonge-db01.database.windows.net;Initial Catalog=202301-easylist-db;Persist Security Info=True;User ID=system;Password=Cenfotec123!";
        }

        public static SqlDao GetInstance()
        {
            if (_instance == null)
            {
                _instance = new SqlDao();
            }
            return _instance;
        }

        public void ExecuteProcedure(SqlOperation sqlOperation)
        {
            using (var conn = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                foreach (var param in sqlOperation.Parameters)
                {
                    command.Parameters.Add(param);
                }

                conn.Open();
                command.ExecuteNonQuery();
            }
        }

        public List<Dictionary<string, object>> ExecuteQueryProcedure(SqlOperation sqlOperation)
        {
            var lstResult = new List<Dictionary<string, object>>();

            using (var conn = new SqlConnection(_connectionString))
            using (var command = new SqlCommand(sqlOperation.ProcedureName, conn)
            {
                CommandType = CommandType.StoredProcedure
            })
            {
                foreach (var param in sqlOperation.Parameters)
                {
                    command.Parameters.Add(param);
                }

                conn.Open();

                var reader = command.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        var dictRow = new Dictionary<string, object>();

                        for (var index = 0; index < reader.FieldCount; index++)
                        {
                            var key = reader.GetName(index);
                            var value = reader.GetValue(index);

                            dictRow.Add(key, value);
                        }
                        lstResult.Add(dictRow);
                    }
                }
            }
            return lstResult;
        }

    }
}
