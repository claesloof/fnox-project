package boxinator.rest.service.resources;

import java.util.List;

import boxinator.rest.service.entity.Box;
import boxinator.rest.service.repository.BoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoxResource {

    @Autowired
    private BoxRepository boxRepository;

    @CrossOrigin
    @GetMapping("/boxes")
    public List<Box> get() {
        return boxRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/boxes")
    public Box post(@RequestBody Box box) {
        return boxRepository.save(box);
    }
}
