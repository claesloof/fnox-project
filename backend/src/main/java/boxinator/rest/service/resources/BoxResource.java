package boxinator.rest.service.resources;

import java.net.URI;
import java.util.List;
import java.util.Map;

import boxinator.rest.service.entity.Box;
import boxinator.rest.service.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.print.attribute.standard.Destination;

@RestController
public class BoxResource {

    @Autowired
    private BoxRepository boxRepository;

    @CrossOrigin
    @GetMapping("/boxes")
    public List<Box> retrieveAllBoxes() {
        return boxRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/boxes")
    public Box createBox(@RequestBody Box box) {
        return boxRepository.save(box);
    }
}
