import com.techelevator.dao.BaseDaoTest;
import com.techelevator.dao.JdbcCakeDao;
import com.techelevator.dao.JdbcUserDao;
import com.techelevator.model.Cake;
import com.techelevator.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class JdbcCakeDaoTest extends BaseDaoTest {



    private JdbcCakeDao sut;

    @BeforeEach
    public void setup() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        sut = new TestJdbcCakeDao(jdbcTemplate);
    }

    @Test
    public void getStandardCakes_returns_all_cakes() {
        List<Cake> cakes = sut.getStandardCakes();

        assertNotNull(cakes);
        assertEquals(2, cakes.size());


    }

    public class TestJdbcCakeDao extends JdbcCakeDao {
        public TestJdbcCakeDao(JdbcTemplate jdbcTemplate) {
            super(jdbcTemplate, null, null, null, null, null, null);
        }
    }

}
