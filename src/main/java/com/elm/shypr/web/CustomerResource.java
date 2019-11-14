package com.elm.shypr.web;

import com.elm.shypr.domain.Customer;
import com.elm.shypr.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerResource {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(customerRepository.findById(id).orElse(null));
    }

    @PostMapping
    public void save(@RequestBody @Valid Customer customer) {
        customerRepository.save(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        customerRepository.deleteById(id);
    }
}
