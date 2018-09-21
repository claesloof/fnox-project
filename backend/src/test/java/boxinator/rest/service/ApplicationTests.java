package boxinator.rest.service;

import boxinator.rest.service.entity.Box;
import boxinator.rest.service.resources.BoxResource;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(BoxResource.class)
public class ApplicationTests {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private BoxResource boxResource;

	/**
	 * Performs a mock get request
	 * Creates a singleton list with a Box that will be returned
	 * Asserts if response has an item
	 * Asserts if item in response has name that was declared
	 * @throws Exception
	 */
	@Test
	public void getBoxes() throws Exception {
		Box box = new Box();
		box.setName("test");
		List<Box> boxes = singletonList(box);

		given(boxResource.get()).willReturn(boxes);

		mvc.perform(get("/boxes")
				.contentType(APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1)))
				.andExpect(jsonPath("$[0].name", is(box.getName())));
	}

	/**
	 * Performs a mock post request with an empty box (currently acceptable)
	 * Asserts if OK status
	 * @throws Exception
	 */
	@Test
	public void postBox() throws Exception {
		Box box = new Box();
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(box);


		this.mvc.perform(post("/boxes")
				.contentType(APPLICATION_JSON)
				.content(json))
				.andExpect(status().isOk());

	}

}
